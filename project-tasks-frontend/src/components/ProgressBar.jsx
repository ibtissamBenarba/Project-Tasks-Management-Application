<div className="progress position-relative" style={{ height: "30px" }}>
  <div
    className="progress-bar bg-success"
    role="progressbar"
    style={{ width: `${progress || 0}%`, transition: "width 0.5s" }}
    aria-valuenow={progress || 0}
    aria-valuemin="0"
    aria-valuemax="100"
  />
  <span className="position-absolute top-50 start-50 translate-middle fw-bold text-dark">
    {progress != null ? `${progress}%` : "0%"}
  </span>
</div>
