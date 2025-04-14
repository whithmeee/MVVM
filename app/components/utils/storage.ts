export const getLocalStorageItem = (key: string): string | null => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

export const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};
