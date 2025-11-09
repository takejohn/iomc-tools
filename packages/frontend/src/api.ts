export async function fetchPing() {
	const res = await fetch('/api/ping');
	return await res.json();
}
