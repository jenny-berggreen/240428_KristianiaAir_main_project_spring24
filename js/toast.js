const displayToast = () => {
	const toast = document.querySelector('.toast');
	toast.textContent = 'Trip registered!'
	toast.style.display = 'block';
	setTimeout(() => { // display toast for 5 seconds
		toast.style.display = 'none';
	}, 5000);
};

export { displayToast };