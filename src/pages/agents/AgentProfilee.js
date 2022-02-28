// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import AgentProfile from '../../sections/@Agent/AgentProfile';

// ----------------------------------------------------------------------

export default function ContractorApp() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Contractor: Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12}>
            <AgentProfile />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
