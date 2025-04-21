const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/contactUs`;

const content = async (formData,userId) => {
    try {
        const res = await fetch(`${BACKEND_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          
          const json = await res.json();
          if (json.error) {
            throw new Error(json.error);
          }
          return json;
          
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  export default { content };