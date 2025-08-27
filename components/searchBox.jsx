"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox ({ className }) {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const containerRef = useRef(null);
    const abortRef = useRef(null);

    const debouncedQuery = useDebounce(query, 250);

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setHighlightIndex(-1);
            }
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.trim().length < 1) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        if (abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(debouncedQuery)}&count=10&language=pt&format=json`;
        fetch(url, { signal: controller.signal })
            .then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to fetch")))
            .then(data => {
                const results = Array.isArray(data?.results) ? data.results : [];
                setSuggestions(results);
                setIsOpen(results.length > 0);
                setHighlightIndex(-1);
            })
            .catch(() => {
                // silently ignore
            });

        return () => controller.abort();
    }, [debouncedQuery]);

    const onSelect = useCallback((item) => {
        if (!item) return;
        const lat = item.latitude;
        const lon = item.longitude;
        try {
            localStorage.setItem('lat', String(lat));
            localStorage.setItem('lon', String(lon));
        } catch {}
        window.location.href = `/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&timezone=${encodeURIComponent(item.timezone)}`;
        setIsOpen(false);
        setHighlightIndex(-1);
    }, [router]);

    const onKeyDown = useCallback((e) => {
        if (!isOpen || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
                e.preventDefault();
                onSelect(suggestions[highlightIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            setHighlightIndex(-1);
        }
    }, [highlightIndex, isOpen, suggestions, onSelect]);

    const useMyLocation = useCallback(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            try {
                localStorage.setItem('lat', String(lat));
                localStorage.setItem('lon', String(lon));
            } catch {}
            window.location.href = `/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&timezone=${encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)}`;
        });
    }, [router]);

    const renderSuggestion = useCallback((item, index) => {
        const isActive = index === highlightIndex;
        const name = [item.name, item.admin1, item.country].filter(Boolean).join(', ');
        return (
            <button
                key={`${item.id || item.name}-${index}`}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${isActive ? 'bg-gray-100' : ''}`}
                onMouseEnter={() => setHighlightIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(item)}
            >
                <span className="block text-sm text-gray-800 font-semibold">{name}</span>
                <span className="block text-xs text-gray-500">Lat {item.latitude}, Lon {item.longitude}</span>
            </button>
        );
    }, [highlightIndex, onSelect]);

    return (
        <>
            <div ref={containerRef} className={`m-auto w-full h-fit flex flex-row justify-between items-center gap-[20px] relative ${className}`}>
                <div className="bg-white w-full h-fit flex flex-row gap-[5px] p-[5px] px-[20px] rounded-full">
                    <Input
                        className="w-full p-0 border-0 font-bold text-black text-2xl"
                        id="search"
                        placeholder="Search a location"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        onFocus={() => setIsOpen(suggestions.length > 0)}
                        autoComplete="off"
                    />

                    <label htmlFor="search">
                        <Search size={35} />
                    </label>
                </div>

                <Button onClick={useMyLocation} className="w-fit h-[100%] text-xl bg-white text-black font-bold rounded-full cursor-pointer hover:bg-gray-200">Use my current location <MapPin size={104} /></Button>

                {isOpen && suggestions.length > 0 && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
                        {suggestions.map((s, i) => renderSuggestion(s, i))}
                    </div>
                )}
            </div>
        </>
    )
}

function useDebounce(value, delayMs) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(t);
    }, [value, delayMs]);
    return debounced;
}