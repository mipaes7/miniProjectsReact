const ENDPOINT_CAT_FACT = 'https://catfact.ninja/fact';

export const getRandomFact = async () => {
    try {
        const res = await fetch(ENDPOINT_CAT_FACT);
        if (!res.ok) throw new Error('error fetching fact');
        const data = await res.json();
        const { fact } = data;
        return fact;
    } catch (error) {
        console.log(error);
    }
}