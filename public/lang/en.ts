interface Navbar {
    search: string;
    type: Type[];
    category: string;
    country: string;
    year: string;
    login: string;
    register: string;
    logout: string;
}

interface Type {
    value: string;
    title: string;
}

interface AdminNavbar {
    movie: string;
    create: string;
}

interface Theme {
    light: string;
    dark: string;
    system: string;
}

interface EnTranslations {
    home_navbar: Navbar;
    admin_navbar: AdminNavbar;
    theme: Theme;
    edit: string;
    save: string;
    back: string;
}


const en: EnTranslations = {
    home_navbar: {
        search: 'Search movie',
        type: [
            {
                title:'Serie',
                value: 'series'
            },
            {
                title:'Single',
                value: 'single'
            },
            {
                title:'Cartoon',
                value: 'hoathinh'
            },
            {
                title:'TV Shows',
                value: 'tvshow'
            },
        ],
        category: 'Category',
        country: 'Country',
        year: 'Year',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
    },
    admin_navbar: {
        movie: 'List Movie',
        create: 'Create Movie',
    },
    theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
    },
    edit: 'Edit',
    save: 'Save',
    back: 'Back',
};

export default en;
