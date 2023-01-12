interface IAppConfig {
    appTitle: string;
    appVersion: string;
    appDescription: string;
    appOgImageUrl: string;
}

const config: IAppConfig = {
    appTitle: 'Hitbit',
    appVersion: 'alpha-0.0.1',
    appDescription: 'Hitbit is a virtual casino that allows users to play with cryptocurrencies',
    appOgImageUrl: 'https://picsum.photos/1200/630',
};

export { config, IAppConfig };
