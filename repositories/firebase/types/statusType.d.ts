export type StatusType = {
    id: string;
    name: string;
}

export type StatusTypes = Record<StatusType['id'], StatusType>;
