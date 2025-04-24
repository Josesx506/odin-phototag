
function FormField({ 
  name, label, type = 'text', 
  placeholder, ref, ...rest 
}) {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <label htmlFor={name}>{label}</label>
      <input style={{padding:'0.15em 0.3em', borderRadius:'0.5em',border:'1px solid darkgray', fontSize:'1rem'}} 
        id={name} type={type} placeholder={placeholder} ref={ref} {...rest} required/>
    </div>
  );
}

export { FormField };