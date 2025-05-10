export interface Blog {
    id: number;
    title: string;
    author: Author;
    category: string;
    published_at: string;
    is_draft: boolean;
    featured_image: string;
    slug: string;
}

export interface Author {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export interface Userdata {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirmPassword: string,
}