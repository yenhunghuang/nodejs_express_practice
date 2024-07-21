const { faker } = require("@faker-js/faker");
const articles = [];

for (let i = 0; i < 5; i++) {
    articles.push({
        id: i,
        title: faker.lorem.sentence(),
        subtitle: faker.lorem.sentence(),
        createDate: faker.date.past().toString(),
        content: faker.lorem.paragraphs(),
        publish: true,
        url: `/articles/${i}`,
    });
}

module.exports = articles;
