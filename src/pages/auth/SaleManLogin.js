import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_SALEMAN_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import ContractorLoginForm from '../../sections/auth/login/SalesManLoginForm';
// Images
import LoginBack from '../../assets/image/AgentLogin.jpg'
import Team from '../../assets/image/logo_full.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ContractorLogin() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login" sx={{
      backgroundImage: `url(${LoginBack})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to={PATH_SALEMAN_AUTH.register}>
                Register
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {/* {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Team Track
            </Typography>
            <Image
              alt="login"
              src={Team}
            />
          </SectionStyle>
        )} */}

        <Container maxWidth="sm">
          <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Teams :    Saleman Login
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>

              {/* <Tooltip title={capitalCase(method)} placement="right">
                <>
                  <Image
                    disabledEffect
                    src={Team}
                    sx={{ width: 82, height: 32 }}
                  />
                </>
              </Tooltip> */}
            </Stack>
            <ContractorLoginForm />
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
             All Right Reserved By 
              <Link underline="always" color="text.primary" href="#">
            Team Member Tracker
              </Link>
              <br />
              Design By
              <Link underline="always" color="text.primary" href="#">
               HNH Tech Solution
              </Link>
              .
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
