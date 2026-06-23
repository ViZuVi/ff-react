import { UModal } from "@/shared/components/ui/Modal/Modal";
import { Box, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { InboxInvitations } from "./InboxInvitations";
import { OutboxInvitations } from "./OutboxInvitations";

interface props {
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// TODO dry TabPanel & a11yProps
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ flexGrow: 1 }}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, width: "100%" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const ProfileModal = ({ open, onClose }: props) => {
  const [value, setValue] = useState(1);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <UModal
      open={open}
      onClose={onClose}
      title="Информация пользователя"
      divider
    >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "auto",
          minWidth: "60vw",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: "divider" }}
          aria-label="profile tabs"
        >
          <Tab disabled label="Личная информация" {...a11yProps(0)} />
          <Tab label="Входящие приглашения" {...a11yProps(1)} />
          <Tab label="Исходящие приглашения" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          1
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InboxInvitations />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OutboxInvitations />
        </TabPanel>
      </Box>
    </UModal>
  );
};
