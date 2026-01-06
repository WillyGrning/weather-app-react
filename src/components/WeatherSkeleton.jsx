/**
 * Loading skeleton for WeatherCard
 */
export default function WeatherSkeleton() {
  return (
    <div className="weather-card">
      <div className="skeleton-wrapper">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-temp"></div>
        <div className="skeleton skeleton-description"></div>
        <div className="weather-details">
          <div className="detail-item">
            <div className="skeleton skeleton-detail"></div>
          </div>
        </div>
        <div className="skeleton skeleton-time"></div>
      </div>
    </div>
  );
}
