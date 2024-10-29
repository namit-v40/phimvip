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

interface ViTranslations {
    home_navbar: Navbar;
    admin_navbar: AdminNavbar;
    theme: Theme;
    edit: string;
    save: string;
    back: string;
}

const vi: ViTranslations = {
    home_navbar: {
        search: 'Tìm kiếm phim',
        type: [
            {
                title:'Phim bộ',
                value: 'series'
            },
            {
                title:'Phim lẻ',
                value: 'single'
            },
            {
                title:'Hoạt hình',
                value: 'hoathinh'
            },
            {
                title:'TV Shows',
                value: 'tvshow'
            }
        ],
        category: 'Danh mục',
        country: 'Quốc gia',
        year: 'Năm',
        login: 'Đăng nhập',
        register: 'Đăng ký',
        logout: 'Đăng xuất',
    },
    admin_navbar: {
        movie: 'Danh sách phim',
        create: 'Tạo mới phim'
    },
    theme: {
        light: 'Sáng',
        dark: 'Tối',
        system: 'Hệ thống',
    },
    edit: 'Sửa',
    save: 'Lưu',
    back: 'Quay lại',
};

export default vi;