import { faker } from "@faker-js/faker";

const recommendations = [
    {
        id: 1,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 30
    },
    {
        id: 2,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 3
    },
    {
        id: 3,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 23
    },
    {
        id: 4,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 34
    },
    {
        id: 5,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 45
    },
    {
        id: 6,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 67
    },
    {
        id: 7,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 87
    },
    {
        id: 8,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 21
    },
    {
        id: 9,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 33
    },
    {
        id: 10,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 48
    }
];

const recommendations30 = [
    {
        id: 1,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 1
    },
    {
        id: 2,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 2
    },
    {
        id: 3,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 3
    },
    {
        id: 4,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 4
    },
    {
        id: 5,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 5
    },
    {
        id: 6,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 6
    },
    {
        id: 7,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 7
    },
    {
        id: 8,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: -3
    },
    {
        id: 9,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: -2
    },
    {
        id: 10,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: -5
    }
];

const recommendations70 = [
    {
        id: 1,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 20
    },
    {
        id: 2,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 40
    },
    {
        id: 3,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 50
    },
    {
        id: 4,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 35
    },
    {
        id: 5,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 67
    },
    {
        id: 6,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 94
    },
    {
        id: 7,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 45
    },
    {
        id: 8,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 88
    },
    {
        id: 9,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 98
    },
    {
        id: 10,
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/${faker.company.catchPhraseDescriptor()}`,
        score: 76
    }
];

const factory = {
    recommendations,
    recommendations30,
    recommendations70
}

export default factory;