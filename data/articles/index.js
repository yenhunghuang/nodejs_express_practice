const { faker } = require("@faker-js/faker");
const articles = [];

for (let i = 0; i < 10; i++) {
    articles.push({
        title: faker.lorem.sentence(),
        subtitle: faker.lorem.sentence(),
        date: faker.date.past().toString(),
        content: faker.lorem.paragraphs(),
        publish: Math.random() < 0.5,
        url: `/articles/${i}`,
    });
}

module.exports = articles;
