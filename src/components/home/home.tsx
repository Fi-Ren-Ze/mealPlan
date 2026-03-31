import { useState } from 'react';
import {
  IconHome,
  IconCalendar,
  IconToolsKitchen2,
  IconBook,
  IconShoppingCart,
  IconLogout,
  IconSwitchHorizontal,
  IconSalad,
  IconLogin,
  IconUserCircle,
} from '@tabler/icons-react';
import { Group, Text, Stack, Modal } from '@mantine/core';
import { MealPlanSchedule } from '../calendars/MealPlanSchedule';
import classes from './NavbarSimple.module.css';

const data = [
  { link: '', label: 'Home', icon: IconHome },
  { link: '', label: 'Plan', icon: IconCalendar },
  { link: '', label: 'Pantry', icon: IconToolsKitchen2 },
  { link: '', label: 'Recipes', icon: IconBook },
  { link: '', label: 'Shopping List', icon: IconShoppingCart },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div className={classes.layout}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header}>
            <IconSalad size={28} stroke={1.5} color="#f0edd8" />
            <Text fw={700} size="lg" c="#f0edd8">Eating Good</Text>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); setIsLoggedIn((prev) => !prev); }}>
            {isLoggedIn ? (
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            ) : (
              <IconLogin className={classes.linkIcon} stroke={1.5} />
            )}
            <span>{isLoggedIn ? 'Change account' : 'Login'}</span>
          </a>

          {isLoggedIn && (
            <>
              <Modal opened={profileModalOpen} onClose={() => setProfileModalOpen(false)} title="User Profile">
                <Text>Modify user profile</Text>
              </Modal>
              <div className={classes.profile} onClick={() => setProfileModalOpen(true)} style={{ cursor: 'pointer' }}>
                <IconUserCircle className={classes.linkIcon} stroke={1.5} />
                <div>
                  <Text size="sm" fw={600} c="#f0edd8">Jane Doe</Text>
                  <Text size="xs" c="#8a9460">jane@example.com</Text>
                </div>
              </div>
            </>
          )}

          {isLoggedIn && (
            <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); setIsLoggedIn(false); }}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          )}
        </div>
      </nav>

      <main className={classes.content}>
        {active === 'Home' && (
          <Stack align="center" justify="center" className={classes.contentInner}>
            <IconSalad size={64} stroke={1} color="#3a4520" />
            <Text size="xl" fw={700}>Welcome to Eating Good</Text>
            {!isLoggedIn && (
              <Text c="dimmed">Please login to get started</Text>
            )}
          </Stack>
        )}
        {active === 'Plan' && <MealPlanSchedule />}
      </main>
    </div>
  );
}