import { faker } from "@faker-js/faker";

const recommendations = [
    {
        id: 1,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 2,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 3,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 4,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 5,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 6,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 7,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 8,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 9,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    },
    {
        id: 10,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: faker.random.numeric()
    }
];

const factory = {
    recommendations
}

export default factory;