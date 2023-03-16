import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { useBirthdayListContext } from 'contexts/BirthdayListContext';
import { usePageListContext } from 'contexts/PageListContext';
import { ModalType } from 'types/Modal';

type Props = {
  title?: string;
};

export const BirthdayToolbar = (props: Props) => {
  const { title } = props;
  const { onOpen, exportData } = usePageListContext();
  const { setSearchQuery } = useBirthdayListContext();

  return (
    <Stack
      direction="row"
      justifyContent={title ? 'space-between' : 'flex-end'}
      className="birthday-toolbar"
    >
      <Stack
        direction="row"
        spacing={3}
      >
        {title && <h1 className="birthday-toolbar__title">{title}</h1>}
        <TextField
          type="search"
          placeholder="Search by Name"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Stack>

      <Stack
        direction="row"
        className="birthday-toolbar__actions"
      >
        <button
          onClick={() => onOpen(ModalType.IMPORT)}
          className="text-button"
        >
          Import
        </button>
        <button
          onClick={exportData}
          className="text-button"
        >
          Export
        </button>
        <button
          onClick={() => onOpen(ModalType.ADD)}
          className="primary-button birthday-toolbar__button"
        >
          Add Entry
        </button>
      </Stack>
    </Stack>
  );
};
