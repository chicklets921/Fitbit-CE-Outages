function mySettings(props) {
    return (
        <Page>
            <Section
                title={<Text bold align="center">Outage Settings</Text>}>
                <Toggle settingsKey="toggle" label="Toggle Switch" />
            </Section>
        </Page>
    );
}

registerSettingsPage(mySettings);