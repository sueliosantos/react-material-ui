import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

interface IMenuLateraProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  label: string;
  icon: string;
  onClick: (() => void) | undefined;
}

const LinstItemLink: React.FC<IListItemLinkProps> = ({ to, label, icon, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
export const MenuLateral: React.FC<IMenuLateraProps> = ({ children }) => {

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const theme = useTheme();

  const smDonw = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDonw ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column">
          <Box
            width='100%'
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">

            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="/static/images/avatar/1.jpg"
            />
          </Box>

          <Divider />

          <Box flex={1} >
            <List component="nav">
              {drawerOptions.map(drawerOptions => (
                <LinstItemLink
                  key={drawerOptions.path}
                  icon={drawerOptions.icon}
                  label={drawerOptions.label}
                  to={drawerOptions.path}
                  onClick={smDonw ? toggleDrawerOpen : undefined} />
              )
              )
              }
            </List>

          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDonw ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};