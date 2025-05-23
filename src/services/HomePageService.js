const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const showProducts = async () => {
    try {
        const res = await fetch(`${BASE_URL}/MLineFashion`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return res.json();
    }
    catch (error) {
        console.log(error);
    }

}

export { showProducts };