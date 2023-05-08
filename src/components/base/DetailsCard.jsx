import { useTheme } from "@emotion/react";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Infos from "./Infos";

export default function DetailsCard({
  title,
  subtitle,
  avatar,
  email,
  location,
  phone,
  about,
  education,
  expertise,
}) {
  const { palette } = useTheme();

  const infos = {
    location,
    phone,
    email,
  };

  const blockXsNone = {
    xs: "none",
    sm: "block",
    md: "block",
    lg: "block",
    xl: "block",
  };

  const flexXsNone = {
    xs: "none",
    sm: "flex",
    md: "flex",
    lg: "flex",
    xl: "flex",
  };

  return (
    <DetailsCardStyled
      sx={{
        maxWidth: "1017px",
        backgroundColor: palette.background.paper,
        borderRadius: 3.5,
        overflow: "hidden",
      }}
    >
      <Header>
        <Box
          sx={{
            height: 140,
            backgroundColor: palette.primary.main,
          }}
        >
          <Box
            sx={{
              padding: 3,
              display: blockXsNone,
            }}
          >
            <Avatar
              sx={{
                height: 200,
                width: 200,
                borderRadius: 100,
                border: 8,
                borderColor: palette.neutral[50],
              }}
              src={avatar}
              alt="imagem de perfil"
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: 100,
            paddingX: 3,
            display: flexXsNone,
            justifyContent: "flex-end",
          }}
        >
          <MoreHorizRoundedIcon sx={{ fontSize: "48px" }} />
        </Box>
        <Box paddingX={4}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="semiBold1" color="text.secondary">
              {subtitle}
            </Typography>
          ) : (
            ""
          )}
        </Box>
      </Header>
      <Content spacing={5} padding={4} paddingBottom={10}>
        {email || phone || location ? (
          <ContentInfos>
            <Infos infos={infos} />
          </ContentInfos>
        ) : (
          ""
        )}
        {about ? (
          <ContentAbout maxWidth={616}>
            <Typography variant="h3" gutterBottom>
              About
            </Typography>
            <Typography variant="body1">{about}</Typography>
          </ContentAbout>
        ) : (
          ""
        )}
        {education?.length > 0 ? (
          <ContentEducation width={616}>
            <List>
              <Typography variant="h3" gutterBottom>
                Education
              </Typography>
              {education.map((e, index) => {
                return (
                  <ListItem
                    key={index}
                    sx={{
                      paddingX: 1,
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 32,
                        }}
                      >
                        <ArrowRightRoundedIcon />
                      </ListItemIcon>
                      <Typography variant="semiBold1">
                        {e.course}, {e.school}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        paddingLeft: 4,
                      }}
                      variant="body1"
                      color="text.secondary"
                    >
                      {e.startYear} - {e.endYear}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </ContentEducation>
        ) : (
          ""
        )}
        {expertise?.length > 0 ? (
          <ContentExpertise width={616}>
            <Typography variant="h3" gutterBottom>
              Expertise
            </Typography>
            <Typography variant="body1">{expertise.join(", ")}</Typography>
          </ContentExpertise>
        ) : (
          ""
        )}
      </Content>
    </DetailsCardStyled>
  );
}

const DetailsCardStyled = styled(Box)(() => ({}));
const Header = styled(Box)(() => ({}));
const Content = styled(Stack)(() => ({}));
const ContentInfos = styled(Box)(() => ({}));
const ContentAbout = styled(Box)(() => ({}));
const ContentEducation = styled(Box)(() => ({}));
const ContentExpertise = styled(Box)(() => ({}));
