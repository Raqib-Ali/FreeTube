
export interface VideoContract{
    VideoId: number;
    Title: string;
    Description:string;
    Url: string;
    Views: number;
    Like: number;
    Dislike: number;
    Comments: string[];
    Category: string;
}