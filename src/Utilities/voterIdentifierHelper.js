

export const getOrCreateVoterIdentifier = () => {
    let voterIdentifier = localStorage.getItem("voterIdentifier");
    if (!voterIdentifier) {
        voterIdentifier = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        localStorage.setItem("voterIdentifier", voterIdentifier);
    }
    return voterIdentifier;
};

export default getOrCreateVoterIdentifier;