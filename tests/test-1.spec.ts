import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type:string;
    value:string;
  };

}

const Elements = [
  {
    locator: (p:Page) : Locator => p.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo Link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (p:Page)  : Locator  => p.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP Link',
    text: 'MCP',
    attribute: {
      type: 'href',
      value: '/mcp/introduction'
    },
  },
  {
    locator: (p:Page) : Locator => p.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI Link',
    text: 'CLI',
    attribute: {
      type: 'href',
      value: '/agent-cli/introduction'
    },
  },
  {
    locator: (p:Page) : Locator  => p.getByRole('link', { name: 'API' }),
    name: 'API Link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright'
    },
  },
  {
    locator: (p:Page)  : Locator => p.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js Button',
    text: 'Node.js',
  },
  {
    locator: (p:Page)  : Locator => p.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub Icon',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright'
    },
  },
  {
    locator: (p:Page)  : Locator => p.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server Icon',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord'
    },
  },
  {
    locator: (p:Page)  : Locator => p.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'LightMode Icon',
  },
  {
    locator: (p:Page)  : Locator => p.getByRole('button', { name: 'Search (Control+k)' }),
    name: 'Search Input',
  },
  {
    locator: (p:Page)  : Locator => p.getByRole('link', { name: 'Docs' }),
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    },
  },
    
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://playwright.dev/');
  });
  
  test('Проверка отображения элементов навигации хэдера', async ({ page }) => {
    Elements.forEach( ({locator, name}) =>{
      test.step(`Проверка отображения элемента ${name}`, async () => {
       await expect.soft(locator(page)).toBeVisible();
      });
    });
});

  test('Проверка названия элементов навигации хэдера', async ({ page }) => {
    Elements.forEach(({locator, name , text}) => {
      if (text) {
        test.step(`Проверка названия элемента ${text} хедера`, async ()=> {
          await expect.soft(locator(page)).toContainText(text);
        });
      };
    })
});

  test('Проверка атрибутов href элементов навигации хэдера', async ({ page }) => {
    Elements.forEach(({locator, name, attribute}) => {
      if (attribute) {
        test.step(` Проверка атрибута href элемента ${name}`, async() => {
          await expect.soft(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    })
  });

  test('Проверка переключения light mode', async ({ page }) => {
  page.getByRole('button', { name: 'Switch between dark and light' }).click();
  page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark')
});

  test('Проверка отображения зоголовка', async ({ page }) => {
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
    .toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.');
});

  test('Проверка кнопки Get started', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
});
})

