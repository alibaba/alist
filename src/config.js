const config = {
    baseUrl: 'https://www.yuque.com/api/v2',
    headers: {
        'User-Agent': 'NoPage',
            'X-Auth-Token': 'YHPLnELGm1k9jvk0ghrTTPD7ekXrl7gdzLMHjOiX',
    },
    title: 'NoPage',
    repos: [
        {
            name: 'NoForm',
            namespace: 'https://www.yuque.com/nopage/noform/brief-intro',
        },
        {
            name: 'NoList',
            namespace: 'https://www.yuque.com/nopage/nolist/start',
        },
        {
            name: 'Snipx',
            namespace: 'https://www.yuque.com/nopage/snipx/start',
        },
        {
            name: 'NoWrapper',
            namespace: 'https://www.yuque.com/nopage/nowrapper/wrapper',
        }
    ],
    githubUrl: 'https://github.com/alibaba/nopage',
};

config.repos.forEach((repo) => {
    // format namespace
    repo.namespace = repo.namespace.replace(/https:\/\/www.yuque.com\//, '');
})

module.exports = config;