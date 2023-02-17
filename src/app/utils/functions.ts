class Formatters {
    /**
     *
     * @param targetTime a epoch time in milliseconds
     * @returns a time in the format of HH:MM:SS
     */
    static formatCountdownTime(targetTime: string): string {
        const currentDate = new Date();
        const targetDate = new Date(targetTime);

        return '';
    }
}

export { Formatters };
