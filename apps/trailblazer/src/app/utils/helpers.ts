export const handleLanguageAbbreviation = (language: string) => {
    switch (language) {
        case 'English':
            return 'ENG';
        case 'Japanese':
            return 'JPN';
        case 'French':
            return 'FRE';
        case 'Italian':
            return 'ITA';
        case 'German':
            return 'GER';
        case 'Spanish':
            return 'SPA';
        case 'Korean':
            return 'KOR';
        case 'Chinese':
            return 'CHI';
        default:
            return 'ENG';
    }
};