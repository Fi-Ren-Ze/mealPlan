import { useState } from 'react';
import {
  Text, Stack, Group, UnstyledButton, Modal, TextInput,
  Button, Anchor, Tabs, Select, Textarea,
} from '@mantine/core';
import { IconExternalLink, IconCoffee, IconSalad, IconMoon, IconX } from '@tabler/icons-react';
import { mockRecipes } from '../../data/mockRecipes';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

type RecipeEntry =
  | { type: 'url'; value: string; name: string }
  | { type: 'text'; value: string; name: string };

type DayMeals = Partial<Record<MealType, RecipeEntry>>;

const MEAL_ICONS: Record<MealType, React.ReactNode> = {
  Breakfast: <IconCoffee size={14} />,
  Lunch:     <IconSalad size={14} />,
  Dinner:    <IconMoon size={14} />,
};

function getWeekDays(startDate: Date): Date[] {
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function MealPlanSchedule() {
  const [modalState, setModalState] = useState<{ date: Date; meal: MealType } | null>(null);
  const [dayMeals, setDayMeals] = useState<Record<string, DayMeals>>({});
  const [manualInput, setManualInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [dbSelected, setDbSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('database');
  const [showEditTab, setShowEditTab] = useState(false);

  const today = new Date();

  const week2Start = new Date(today); week2Start.setDate(today.getDate() + 7);
  const week3Start = new Date(today); week3Start.setDate(today.getDate() + 14);
  const week4Start = new Date(today); week4Start.setDate(today.getDate() + 21);

  const thisWeek = getWeekDays(today);
  const week2 = getWeekDays(week2Start);
  const week3 = getWeekDays(week3Start);
  const week4 = getWeekDays(week4Start);

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const openModal = (date: Date, meal: MealType) => {
    const existing = dayMeals[date.toDateString()]?.[meal];
    setModalState({ date, meal });
    setManualInput(existing?.type === 'url' ? existing.value : '');
    setTextInput(existing?.type === 'text' ? existing.value : '');
    setShowEditTab(false);
    const matchedDb = existing?.type === 'url'
      ? (mockRecipes.find((r) => r.type === 'url' && r.url === existing.value)?.id ?? null)
      : existing?.type === 'text'
      ? (mockRecipes.find((r) => r.type === 'text' && r.text === existing.value)?.id ?? null)
      : null;
    setDbSelected(matchedDb);
    if (existing?.type === 'text') setActiveTab('write');
    else if (existing?.type === 'url' && matchedDb) setActiveTab('database');
    else if (existing?.type === 'url' && !matchedDb) setActiveTab('manual');
    else setActiveTab('database');
  };

  const removeRecipe = (date: Date, meal: MealType) => {
    const key = date.toDateString();
    setDayMeals((prev) => {
      const updated = { ...prev[key] };
      delete updated[meal];
      return { ...prev, [key]: updated };
    });
  };

  const save = (entry: RecipeEntry) => {
    if (modalState) {
      const key = modalState.date.toDateString();
      setDayMeals((prev) => ({
        ...prev,
        [key]: { ...prev[key], [modalState.meal]: entry },
      }));
    }
    setModalState(null);
  };

  const recipeOptions = ['Breakfast', 'Lunch', 'Dinner'].map((category) => ({
    group: category,
    items: mockRecipes
      .filter((r) => r.category === category)
      .map((r) => ({ value: r.id, label: r.name })),
  }));

  const renderMealSlot = (date: Date, meal: MealType) => {
    const entry = dayMeals[date.toDateString()]?.[meal];
    return (
      <Group
        key={meal}
        gap={4}
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={(e) => { e.stopPropagation(); openModal(date, meal); }}
      >
        <span style={{ color: '#5a6e30', flexShrink: 0 }}>{MEAL_ICONS[meal]}</span>
        {entry ? (
          <Group gap={4} style={{ flex: 1, minWidth: 0 }}>
            <Text size="xs" fw={600} c="#5a6e30" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {entry.name}
            </Text>
            {entry.type === 'url' && (
              <Anchor
                href={entry.value}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5a6e30', display: 'flex', flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconExternalLink size={32} />
              </Anchor>
            )}
            <UnstyledButton
              onClick={(e) => { e.stopPropagation(); removeRecipe(date, meal); }}
              style={{ color: '#b04040', display: 'flex', flexShrink: 0 }}
            >
              <IconX size={14} />
            </UnstyledButton>
          </Group>
        ) : (
          <Text size="xs" c="dimmed">+ Add</Text>
        )}
      </Group>
    );
  };

  const renderWeek = (days: Date[], label: string) => (
    <Stack gap="xs">
      <Text fw={600} size="sm" c="dimmed">{label}</Text>
      <Group gap="xs" grow>
        {days.map((date) => (
          <div
            key={date.toDateString()}
            style={{
              height: 192,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: '6px 8px',
              background: isToday(date) ? '#e8edda' : '#f8f9f0',
              color: '#3a4520',
              border: isToday(date) ? '2px solid #3a4520' : '2px solid transparent',
              flex: 1,
              minWidth: 0,
            }}
          >
            <Text size="xs" fw={500}>{DAY_LABELS[date.getDay()]}</Text>
            <Text size="lg" fw={700}>{date.getDate()}</Text>
            <Stack gap={6} mt="auto" style={{ width: '100%' }}>
              {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map((meal) =>
                renderMealSlot(date, meal)
              )}
            </Stack>
          </div>
        ))}
      </Group>
    </Stack>
  );

  const modalEntry = modalState
    ? dayMeals[modalState.date.toDateString()]?.[modalState.meal]
    : undefined;

  return (
    <Stack p="md" gap="xl">
      <Text fw={700} size="lg">Meal Plan Schedule</Text>
      {renderWeek(thisWeek, 'This Week')}
      {renderWeek(week2, 'Next Week')}
      {renderWeek(week3, 'In 2 Weeks')}
      {renderWeek(week4, 'In 3 Weeks')}

      <Modal
        opened={modalState !== null}
        onClose={() => setModalState(null)}
        title={modalState ? `${modalEntry ? 'Change' : 'Add'} ${modalState.meal} — ${modalState.date.toDateString()}` : ''}
        size="lg"
      >
        <Tabs value={activeTab} onChange={(v) => setActiveTab(v ?? 'database')}>
          <Tabs.List mb="md">
            <Tabs.Tab value="database">{modalEntry?.type === 'text' ? 'Change Recipe' : 'Select Saved Recipe'}</Tabs.Tab>
            {(!modalEntry || modalEntry.type === 'url') && (
              <Tabs.Tab value="manual">Recipe URL</Tabs.Tab>
            )}
            {!modalEntry && <Tabs.Tab value="write">Write Recipe</Tabs.Tab>}
            {modalEntry?.type === 'text' && showEditTab && (
              <Tabs.Tab value="write">Edit Recipe</Tabs.Tab>
            )}
          </Tabs.List>
          {modalEntry?.type === 'text' && !showEditTab && (
            <Button
              variant="subtle"
              size="xs"
              mb="md"
              onClick={() => { setShowEditTab(true); setActiveTab('write'); }}
            >
              Edit Recipe
            </Button>
          )}

          <Tabs.Panel value="database">
            <Stack>
              <Select
                label="Select a recipe"
                placeholder="Search recipes..."
                data={recipeOptions}
                value={dbSelected}
                onChange={setDbSelected}
                searchable
              />
              <Group justify="flex-end">
                <Button variant="subtle" onClick={() => setModalState(null)}>Cancel</Button>
                <Button
                  disabled={!dbSelected}
                  onClick={() => {
                    const recipe = mockRecipes.find((r) => r.id === dbSelected);
                    if (recipe) {
                      if (recipe.type === 'text') {
                        save({ type: 'text', value: recipe.text, name: recipe.name });
                      } else {
                        save({ type: 'url', value: recipe.url, name: recipe.name });
                      }
                    }
                  }}
                >
                  Save
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="manual">
            <Stack>
              <TextInput
                label="Recipe URL"
                placeholder="https://..."
                value={manualInput}
                onChange={(e) => setManualInput(e.currentTarget.value)}
              />
              <Group justify="flex-end">
                <Button variant="subtle" onClick={() => setModalState(null)}>Cancel</Button>
                <Button
                  disabled={!manualInput.trim()}
                  onClick={() => save({ type: 'url', value: manualInput.trim(), name: 'Custom Recipe' })}
                >
                  Save
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="write">
            <Stack>
              <Textarea
                label="Recipe"
                placeholder="Enter ingredients, steps, notes..."
                value={textInput}
                onChange={(e) => setTextInput(e.currentTarget.value)}
                autosize
                minRows={8}
              />
              <Group justify="flex-end">
                <Button variant="subtle" onClick={() => setModalState(null)}>Cancel</Button>
                <Button
                  disabled={!textInput.trim()}
                  onClick={() => save({ type: 'text', value: textInput.trim(), name: textInput.trim().split('\n')[0].slice(0, 30) })}
                >
                  Save
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </Stack>
  );
}
