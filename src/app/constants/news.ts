interface INew {
    id: number;
    template: string;
}

const news: INew[] = [
    {
        id: 1,
        template: '<div>News 1</div>',
    },
];

export { INew, news };
