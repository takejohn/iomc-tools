export async function fetchHealth() {
	const res = await fetch('/api/health');
	return await res.json();
}
