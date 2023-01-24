interface INew {
    id: number;
    template: string;
}

const news: INew[] = [
    {
        id: 1,
        template: `<div>
    <img src="/assets/carousel/welcome.png" alt="welcome" />
</div>`,
    },
    {
        id: 2,
        template: `<div>
            <h1 class="title has-text-white">This is a news title</h1>
        </div>`,
    },
    {
        id: 3,
        template: `<div></div>`,
    },
];

export { INew, news };
