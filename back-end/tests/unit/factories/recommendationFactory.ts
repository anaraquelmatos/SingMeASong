import { faker } from "@faker-js/faker";

const recommendations = [
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: faker.random.numeric,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    }
];

const factory = {
    recommendations
}

export default factory;