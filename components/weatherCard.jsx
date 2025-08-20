export function WeatherCard ({ className, children }) {
  return (
    <div className={`bg-white/15 backdrop-blur-sm p-8 rounded-xl shadow-[6px_6px_12px_0_rgba(0,0,0,0.05)] ${className}`}>
      {children}
    </div>
  )
}