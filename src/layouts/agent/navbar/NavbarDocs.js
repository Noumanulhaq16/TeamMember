// @mui
import { Stack, Button, Typography, Link } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      {/* <DocIllustration sx={{ width: 1 }} /> */}

      <div>
        <Typography variant="body1" sx={{ color: 'text.danger' }}>
          All Right Resverd By
          <br />
          <Link>
            TEAM MEMBER TRACKER
          </Link>
          <br />
          Desigin By
          <br />
          <Link>
            HNH TECH SOLUTION
          </Link>

        </Typography>
      </div>
    </Stack>
  );
}
