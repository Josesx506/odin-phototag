

function formatTime(inpTime) {
  const hours = Math.floor(inpTime / 3600);
  const minutes = Math.floor((inpTime % 3600) / 60);
  const seconds = inpTime % 60;
  const hourStr = hours > 0 ? hours.toString().padStart(2, '0') + ':' : '';
  const minuStr = minutes.toString().padStart(2, '0');
  const secoStr = seconds.toString().padStart(2, '0')
  const disp = `${hourStr}${minuStr}:${secoStr}`;
  return disp
}

function sanitizeSimpleInputs(data) {
  const sanitized = {};
  
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key]
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    } else {
      sanitized[key] = data[key];
    }
  });
  
  return sanitized;
};

export { formatTime, sanitizeSimpleInputs }