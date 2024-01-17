/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {action} from '@storybook/addon-actions';
import {Button, Header, Keyboard, Menu, MenuTrigger, Popover, Section, Separator, SubmenuTrigger, Text} from 'react-aria-components';
import {MyMenuItem} from './utils';
import React from 'react';
import styles from '../example/index.css';

export default {
  title: 'React Aria Components'
};

export const MenuExample = () => (
  <MenuTrigger>
    <Button aria-label="Menu">☰</Button>
    <Popover>
      <Menu className={styles.menu} onAction={action('onAction')}>
        <Section className={styles.group}>
          <Header style={{fontSize: '1.2em'}}>Section 1</Header>
          <MyMenuItem>Foo</MyMenuItem>
          <MyMenuItem>Bar</MyMenuItem>
          <MyMenuItem>Baz</MyMenuItem>
          <MyMenuItem href="https://google.com">Google</MyMenuItem>
        </Section>
        <Separator style={{borderTop: '1px solid gray', margin: '2px 5px'}} />
        <Section className={styles.group}>
          <Header style={{fontSize: '1.2em'}}>Section 2</Header>
          <MyMenuItem>Foo</MyMenuItem>
          <MyMenuItem>Bar</MyMenuItem>
          <MyMenuItem>Baz</MyMenuItem>
        </Section>
      </Menu>
    </Popover>
  </MenuTrigger>
);

export const MenuComplex = () => (
  <MenuTrigger>
    <Button aria-label="Menu">☰</Button>
    <Popover>
      <Menu className={styles.menu}>
        <MyMenuItem>
          <Text slot="label">Copy</Text>
          <Text slot="description">Description</Text>
          <Keyboard>⌘C</Keyboard>
        </MyMenuItem>
        <MyMenuItem>
          <Text slot="label">Cut</Text>
          <Text slot="description">Description</Text>
          <Keyboard>⌘X</Keyboard>
        </MyMenuItem>
        <MyMenuItem>
          <Text slot="label">Paste</Text>
          <Text slot="description">Description</Text>
          <Keyboard>⌘V</Keyboard>
        </MyMenuItem>
      </Menu>
    </Popover>
  </MenuTrigger>
);

export const SubmenuExample = () => (
  <MenuTrigger>
    <Button aria-label="Menu">☰</Button>
    <Popover>
      <Menu className={styles.menu} onAction={action('onAction')}>
        <MyMenuItem>Foo</MyMenuItem>
        <SubmenuTrigger>
          <MyMenuItem>Bar</MyMenuItem>
          <Popover className={styles.popover}>
            <Menu className={styles.menu} onAction={action('onAction')}>
              <MyMenuItem>Submenu Foo</MyMenuItem>
              <MyMenuItem>Submenu Bar</MyMenuItem>
              <MyMenuItem>Submenu Baz</MyMenuItem>
            </Menu>
          </Popover>
        </SubmenuTrigger>
        <MyMenuItem>Baz</MyMenuItem>
        <MyMenuItem href="https://google.com">Google</MyMenuItem>
      </Menu>
    </Popover>
  </MenuTrigger>
);

export const SubmenuNestedExample = () => (
  <MenuTrigger>
    <Button aria-label="Menu">☰</Button>
    <Popover>
      <Menu className={styles.menu} onAction={action('onAction')}>
        <MyMenuItem>Foo</MyMenuItem>
        <SubmenuTrigger>
          <MyMenuItem>Bar</MyMenuItem>
          <Popover className={styles.popover}>
            <Menu className={styles.menu} onAction={action('onAction')}>
              <MyMenuItem>Submenu Foo</MyMenuItem>
              <MyMenuItem>Submenu Bar</MyMenuItem>
              <SubmenuTrigger>
                <MyMenuItem>Submenu Baz</MyMenuItem>
                <Popover className={styles.popover}>
                  <Menu className={styles.menu} onAction={action('onAction')}>
                    <MyMenuItem>Second Submenu Foo</MyMenuItem>
                    <MyMenuItem>Second Submenu Bar</MyMenuItem>
                    <MyMenuItem>Second Submenu Baz</MyMenuItem>
                  </Menu>
                </Popover>
              </SubmenuTrigger>
            </Menu>
          </Popover>
        </SubmenuTrigger>
        <MyMenuItem>Baz</MyMenuItem>
        <MyMenuItem href="https://google.com">Google</MyMenuItem>
      </Menu>
    </Popover>
  </MenuTrigger>
);

let manyItemsSubmenu = [
  {key: 'Lvl 1 Item 1', name: 'Lvl 1 Item 1'},
  {key: 'Lvl 1 Item 2', name: 'Lvl 1 Item 2', children: [
    ...[...Array(30)].map((_, i) => ({key: `Lvl 2 Item ${i + 1}`, name: `Lvl 2 Item ${i + 1}`})),
    {key: 'Lvl 2 Item 31', name: 'Lvl 2 Item 31', children: [
      {key: 'Lvl 3 Item 1', name: 'Lvl 3 Item 1'},
      {key: 'Lvl 3 Item 2', name: 'Lvl 3 Item 2'},
      {key: 'Lvl 3 Item 3', name: 'Lvl 3 Item 3'}
    ]}
  ]},
  ...[...Array(30)].map((_, i) => ({key: `Lvl 1 Item ${i + 3}`, name: `Lvl 1 Item ${i + 3}`}))
];

let dynamicRenderFunc = (item) => {
  if (item.children) {
    return (
      <SubmenuTrigger>
        <MyMenuItem key={item.name}>{item.name}</MyMenuItem>
        <Popover className={styles.popover}>
          <Menu items={item.children} className={styles.menu} onAction={action('onAction')}>
            {(item) => dynamicRenderFunc(item)}
          </Menu>
        </Popover>
      </SubmenuTrigger>
    );
  } else {
    return <MyMenuItem key={item.name}>{item.name}</MyMenuItem>;
  }
};

export const SubmenuManyItemsExample = () => (
  <MenuTrigger>
    <Button aria-label="Menu">☰</Button>
    <Popover>
      <Menu items={manyItemsSubmenu} className={styles.menu} onAction={action('onAction')}>
        {(item) => dynamicRenderFunc(item)}
      </Menu>
    </Popover>
  </MenuTrigger>
);
