import { Timestamp } from 'rxjs/internal/operators/timestamp';
export interface Note {
    id: string,
    title: string,
    date: {
        seconds: Number
    },
    body: string,
}