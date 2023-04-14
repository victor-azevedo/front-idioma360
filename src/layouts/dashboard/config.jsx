import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { SvgIcon } from "@mui/material";

export const studentItems = [
  {
    title: "Geral",
    path: "/app",
    icon: <SvgIcon fontSize="small"></SvgIcon>,
  },
  {
    title: "Cursos",
    path: "/app/courses",
    icon: <LanguageRoundedIcon fontSize="small"></LanguageRoundedIcon>,
  },
  {
    title: "Seleções em aberto",
    path: "/app/offerings/open",
    icon: (
      <AssignmentTurnedInRoundedIcon fontSize="small"></AssignmentTurnedInRoundedIcon>
    ),
  },
  {
    title: "Seleções encerradas",
    path: "/app/offerings/closed",
    icon: <AssignmentLateIcon fontSize="small"></AssignmentLateIcon>,
  },
  {
    title: "Turmas disponíveis",
    path: "/app/classes",
    icon: <MenuBookRoundedIcon fontSize="small"></MenuBookRoundedIcon>,
  },
  {
    title: "Consulte suas inscrições",
    path: "/app/enrollments",
    icon: (
      <InsertDriveFileRoundedIcon fontSize="small"></InsertDriveFileRoundedIcon>
    ),
  },
  {
    title: "Conta",
    path: "/app/user/",
    icon: (
      <ManageAccountsRoundedIcon fontSize="small"></ManageAccountsRoundedIcon>
    ),
  },
];

export const adminItems = [
  ...studentItems,
  {
    title: "Gerenciar Cursos",
    path: "/app/admin/courses/",
    icon: <LanguageRoundedIcon fontSize="small"></LanguageRoundedIcon>,
  },
  {
    title: "Gerenciar Seleções",
    path: "/app/admin/offerings",
    icon: (
      <AssignmentTurnedInRoundedIcon fontSize="small"></AssignmentTurnedInRoundedIcon>
    ),
  },
  {
    title: "Gerenciar Turmas",
    path: "/app/admin/classes",
    icon: <MenuBookRoundedIcon fontSize="small"></MenuBookRoundedIcon>,
  },
  {
    title: "Gerenciar Provas",
    path: "/app/admin/tests",
    icon: <MenuBookRoundedIcon fontSize="small"></MenuBookRoundedIcon>,
  },
];
