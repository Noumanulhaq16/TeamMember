import { Container } from '@mui/material';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_ADMIN } from '../../routes/paths';
import ConApproval from '../../sections/@SuperAdmin/ConApproval';

export default function Salemanapproval() {
    const { themeStretch } = useSettings();
    return (
        <Page title="Admin: Saleman Approval">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading="Saleman Approval"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Saleman Approval' },
                    ]}
                />
                <ConApproval />
            </Container>
        </Page>
    );
}