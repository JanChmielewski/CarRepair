export default function Input({ label, fieldId, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={fieldId}>{label}</label>
      <input fieldId={fieldId} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
