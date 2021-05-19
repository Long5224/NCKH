USE [master]
GO
/****** Object:  Database [NCKH]    Script Date: 5/19/21 3:38:50 PM ******/
CREATE DATABASE [NCKH]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'NCKH', FILENAME = N'D:\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\NCKH.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NCKH_log', FILENAME = N'D:\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\NCKH_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [NCKH] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NCKH].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NCKH] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [NCKH] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [NCKH] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [NCKH] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [NCKH] SET ARITHABORT OFF 
GO
ALTER DATABASE [NCKH] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [NCKH] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [NCKH] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [NCKH] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [NCKH] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [NCKH] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [NCKH] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [NCKH] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [NCKH] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [NCKH] SET  ENABLE_BROKER 
GO
ALTER DATABASE [NCKH] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [NCKH] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [NCKH] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [NCKH] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [NCKH] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [NCKH] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [NCKH] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [NCKH] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [NCKH] SET  MULTI_USER 
GO
ALTER DATABASE [NCKH] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [NCKH] SET DB_CHAINING OFF 
GO
ALTER DATABASE [NCKH] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [NCKH] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [NCKH] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [NCKH] SET QUERY_STORE = OFF
GO
USE [NCKH]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[class]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[class](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[facultyID] [bigint] NOT NULL,
 CONSTRAINT [PK_Classes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[course]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course](
	[id] [bigint] NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[Semesterid] [bigint] NOT NULL,
	[tinchi] [int] NULL,
 CONSTRAINT [PK_course] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[course_class]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_class](
	[id] [bigint] NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[Studytimeid] [bigint] NOT NULL,
 CONSTRAINT [PK_course_class_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[evaluation]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[evaluation](
	[Studentid] [bigint] NOT NULL,
	[Semesterid] [bigint] NOT NULL,
	[content] [nvarchar](250) NULL,
 CONSTRAINT [PK_evaluation] PRIMARY KEY CLUSTERED 
(
	[Studentid] ASC,
	[Semesterid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_shedule]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_shedule](
	[studyTimeId] [bigint] NOT NULL,
	[day] [date] NULL,
	[shift] [nvarchar](50) NULL,
	[type] [nvarchar](50) NULL,
	[number] [nvarchar](50) NULL,
	[room] [nvarchar](50) NULL,
	[note] [text] NULL,
 CONSTRAINT [PK_exam_shedule] PRIMARY KEY CLUSTERED 
(
	[studyTimeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[faculty]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[faculty](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
 CONSTRAINT [PK_Faculties] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[general]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[general](
	[id] [bigint] NULL,
	[training_point] [int] NULL,
	[studentId] [bigint] NULL,
	[tuition] [bigint] NULL,
	[scholarship] [bigint] NULL,
	[semesterId] [bigint] NULL,
	[classification] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lesson]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lesson](
	[id] [bigint] NULL,
	[day] [int] NULL,
	[shift] [nvarchar](50) NULL,
	[location] [nvarchar](50) NULL,
	[stageId] [bigint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notification]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notification](
	[id] [bigint] NULL,
	[header] [nvarchar](50) NULL,
	[content] [nvarchar](50) NULL,
	[userId] [bigint] NULL,
	[created_date] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[parent]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[parent](
	[id] [bigint] NOT NULL,
	[firstName] [nvarchar](100) NOT NULL,
	[lastName] [nvarchar](100) NOT NULL,
	[Studentid] [bigint] NOT NULL,
 CONSTRAINT [PK_parent] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Result]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Result](
	[mark_process] [float] NOT NULL,
	[mark_exam] [float] NOT NULL,
	[evaluation] [nvarchar](100) NOT NULL,
	[Studytimeid] [bigint] NOT NULL,
 CONSTRAINT [PK_Result_1] PRIMARY KEY CLUSTERED 
(
	[Studytimeid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[id] [bigint] NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[code] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[semester]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[semester](
	[id] [bigint] NOT NULL,
	[begin_year] [nvarchar](100) NOT NULL,
	[end_year] [nvarchar](100) NOT NULL,
	[times] [int] NULL,
 CONSTRAINT [PK_semester] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[stage]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stage](
	[id] [bigint] NOT NULL,
	[begin_time] [datetime] NULL,
	[end_time] [datetime] NULL,
	[courseClassId] [bigint] NULL,
 CONSTRAINT [PK_stage] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[student]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[student](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](100) NULL,
	[lastName] [nvarchar](100) NULL,
	[dateOfBirth] [nvarchar](100) NULL,
	[placeOfBirth] [nvarchar](100) NULL,
	[phoneNumber] [nvarchar](16) NULL,
	[gender] [bit] NOT NULL,
	[yearOfAdmission] [nvarchar](100) NULL,
	[classID] [bigint] NOT NULL,
 CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[study_time]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[study_time](
	[id] [bigint] NOT NULL,
	[Courseid] [bigint] NOT NULL,
	[studentId] [bigint] NULL,
	[semesterId] [bigint] NULL,
 CONSTRAINT [PK_course_class] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[teacher]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[teacher](
	[id] [bigint] NOT NULL,
	[firstName] [nvarchar](100) NOT NULL,
	[lastName] [nvarchar](100) NOT NULL,
	[phoneNumber] [nvarchar](16) NOT NULL,
	[dateOfBirth] [nvarchar](100) NULL,
	[placeOfBirth] [nvarchar](100) NULL,
	[gender] [bit] NULL,
	[yearOfAdmission] [nvarchar](100) NULL,
	[Classid] [bigint] NOT NULL,
 CONSTRAINT [PK_teacher] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_table]    Script Date: 5/19/21 3:38:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_table](
	[id] [bigint] NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](250) NOT NULL,
	[Roleid] [bigint] NOT NULL,
	[ImageName] [nvarchar](100) NULL,
 CONSTRAINT [PK_user_table] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[class] ON 

INSERT [dbo].[class] ([id], [name], [facultyID]) VALUES (1, N'CNTT1', 1)
SET IDENTITY_INSERT [dbo].[class] OFF
GO
INSERT [dbo].[course] ([id], [name], [Semesterid], [tinchi]) VALUES (1, N'Toán cao cấp', 1, 3)
INSERT [dbo].[course] ([id], [name], [Semesterid], [tinchi]) VALUES (2, N'Lập trình nâng cao', 1, 4)
INSERT [dbo].[course] ([id], [name], [Semesterid], [tinchi]) VALUES (3, N'Triết học Mác', 2, 3)
INSERT [dbo].[course] ([id], [name], [Semesterid], [tinchi]) VALUES (4, N'Lập trình API', 6, 3)
INSERT [dbo].[course] ([id], [name], [Semesterid], [tinchi]) VALUES (5, N'Lập trình mạng', 6, 3)
INSERT [dbo].[course] ([id], [name], [Semesterid], [tinchi]) VALUES (6, N'Lập trình Android', 6, 3)
GO
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (1, N'Lý thuyể', 1)
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (2, N'Bài tập', 1)
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (3, N'Thực hành', 1)
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (4, N'Lý thuyết', 6)
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (5, N'Bài tập', 6)
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (6, N'Thực hàng', 6)
INSERT [dbo].[course_class] ([id], [name], [Studytimeid]) VALUES (7, N'Lý thuyết', 7)
GO
INSERT [dbo].[evaluation] ([Studentid], [Semesterid], [content]) VALUES (1, 1, N'Bình ')
INSERT [dbo].[evaluation] ([Studentid], [Semesterid], [content]) VALUES (1, 2, N'Giỏi')
INSERT [dbo].[evaluation] ([Studentid], [Semesterid], [content]) VALUES (1, 3, N'Tạm ổn')
INSERT [dbo].[evaluation] ([Studentid], [Semesterid], [content]) VALUES (2, 1, N'Xuất Sắc 1')
INSERT [dbo].[evaluation] ([Studentid], [Semesterid], [content]) VALUES (2, 2, N'Bình thường')
GO
INSERT [dbo].[exam_shedule] ([studyTimeId], [day], [shift], [type], [number], [room], [note]) VALUES (6, CAST(N'2021-06-01' AS Date), N'c1', N'Thực hành', N'21', N'102-A2', N'')
INSERT [dbo].[exam_shedule] ([studyTimeId], [day], [shift], [type], [number], [room], [note]) VALUES (7, CAST(N'2021-06-04' AS Date), N'c1', N'Thực hàng', N'21', N'103-A2', N'')
INSERT [dbo].[exam_shedule] ([studyTimeId], [day], [shift], [type], [number], [room], [note]) VALUES (8, CAST(N'2021-06-08' AS Date), N'c1', N'Viết', N'43', N'203-A3', N'')
GO
SET IDENTITY_INSERT [dbo].[faculty] ON 

INSERT [dbo].[faculty] ([id], [name]) VALUES (1, N'CNTT')
SET IDENTITY_INSERT [dbo].[faculty] OFF
GO
INSERT [dbo].[general] ([id], [training_point], [studentId], [tuition], [scholarship], [semesterId], [classification]) VALUES (1, 90, 1, 6400000, 5000000, 1, N'Xuất Sắc')
INSERT [dbo].[general] ([id], [training_point], [studentId], [tuition], [scholarship], [semesterId], [classification]) VALUES (2, 91, 1, 6900000, 0, 2, N'Xuất Sắc')
GO
INSERT [dbo].[lesson] ([id], [day], [shift], [location], [stageId]) VALUES (1, 2, N't1', N'
204A5 NCT GD KTX', 1)
INSERT [dbo].[lesson] ([id], [day], [shift], [location], [stageId]) VALUES (2, 3, N't2', N'303-A2 Giảng đường A2', 2)
INSERT [dbo].[lesson] ([id], [day], [shift], [location], [stageId]) VALUES (3, 5, N't1', N'705-A2 Giảng đường A2', 2)
INSERT [dbo].[lesson] ([id], [day], [shift], [location], [stageId]) VALUES (4, 3, N't1', N'502-A3 Giảng đường A3', 3)
INSERT [dbo].[lesson] ([id], [day], [shift], [location], [stageId]) VALUES (5, 5, N't2', N'303-A2 Giảng đường A2', 3)
GO
INSERT [dbo].[notification] ([id], [header], [content], [userId], [created_date]) VALUES (1, N'abc', N'abc', 2, CAST(N'2021-05-19' AS Date))
INSERT [dbo].[notification] ([id], [header], [content], [userId], [created_date]) VALUES (2, N'bcd', N'bcd', 2, CAST(N'2021-05-18' AS Date))
GO
INSERT [dbo].[Result] ([mark_process], [mark_exam], [evaluation], [Studytimeid]) VALUES (10, 10, N'đạt', 1)
INSERT [dbo].[Result] ([mark_process], [mark_exam], [evaluation], [Studytimeid]) VALUES (9, 10, N'đạt', 2)
INSERT [dbo].[Result] ([mark_process], [mark_exam], [evaluation], [Studytimeid]) VALUES (1, 4, N'chưa đạt', 3)
INSERT [dbo].[Result] ([mark_process], [mark_exam], [evaluation], [Studytimeid]) VALUES (7, 8, N'đạt', 4)
INSERT [dbo].[Result] ([mark_process], [mark_exam], [evaluation], [Studytimeid]) VALUES (8, 9, N'đạt', 5)
GO
INSERT [dbo].[role] ([id], [name], [code]) VALUES (1, N'Phụ Huynh', N'parent')
INSERT [dbo].[role] ([id], [name], [code]) VALUES (2, N'Cố Vấn', N'teacher')
GO
INSERT [dbo].[semester] ([id], [begin_year], [end_year], [times]) VALUES (1, N'2018', N'2019', 1)
INSERT [dbo].[semester] ([id], [begin_year], [end_year], [times]) VALUES (2, N'2018', N'2019', 2)
INSERT [dbo].[semester] ([id], [begin_year], [end_year], [times]) VALUES (3, N'2019', N'2020', 1)
INSERT [dbo].[semester] ([id], [begin_year], [end_year], [times]) VALUES (4, N'2019', N'2020', 2)
INSERT [dbo].[semester] ([id], [begin_year], [end_year], [times]) VALUES (5, N'2020', N'2021', 1)
INSERT [dbo].[semester] ([id], [begin_year], [end_year], [times]) VALUES (6, N'2020', N'2021', 2)
GO
INSERT [dbo].[stage] ([id], [begin_time], [end_time], [courseClassId]) VALUES (1, CAST(N'2018-09-17T00:00:00.000' AS DateTime), CAST(N'2018-11-24T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[stage] ([id], [begin_time], [end_time], [courseClassId]) VALUES (2, CAST(N'2021-05-11T00:00:00.000' AS DateTime), CAST(N'2021-05-30T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[stage] ([id], [begin_time], [end_time], [courseClassId]) VALUES (3, CAST(N'2021-05-11T00:00:00.000' AS DateTime), CAST(N'2021-05-30T00:00:00.000' AS DateTime), 7)
GO
SET IDENTITY_INSERT [dbo].[student] ON 

INSERT [dbo].[student] ([id], [firstName], [lastName], [dateOfBirth], [placeOfBirth], [phoneNumber], [gender], [yearOfAdmission], [classID]) VALUES (1, N'Phạm Hoàng', N'Long', N'2000-02-21', N'Hà Nội', N'0981745134', 1, N'2018', 1)
INSERT [dbo].[student] ([id], [firstName], [lastName], [dateOfBirth], [placeOfBirth], [phoneNumber], [gender], [yearOfAdmission], [classID]) VALUES (2, N'Vũ Xuân', N'Lâm', N'01-01-2000', N'Hải Phòng', N'0123456789', 1, N'2018', 1)
SET IDENTITY_INSERT [dbo].[student] OFF
GO
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (1, 1, 1, 1)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (2, 1, 1, 2)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (3, 1, 1, 3)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (4, 2, 1, 1)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (5, 3, 1, 2)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (6, 4, 1, 6)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (7, 5, 1, 6)
INSERT [dbo].[study_time] ([id], [Courseid], [studentId], [semesterId]) VALUES (8, 6, 1, 6)
GO
INSERT [dbo].[teacher] ([id], [firstName], [lastName], [phoneNumber], [dateOfBirth], [placeOfBirth], [gender], [yearOfAdmission], [Classid]) VALUES (1, N'Phạm Xuân', N'Tích', N'012345678', N'1981-04-05', N'Hà Nội', 1, N'1999', 1)
GO
INSERT [dbo].[user_table] ([id], [username], [password], [Roleid], [ImageName]) VALUES (1, N'long-1', N'25D55AD283AA400AF464C76D713C07AD', 1, N'abc')
INSERT [dbo].[user_table] ([id], [username], [password], [Roleid], [ImageName]) VALUES (2, N'tich-1', N'202cb962ac59075b964b07152d234b70', 2, N'abc')
GO
/****** Object:  Index [IX_Classes_facultyID]    Script Date: 5/19/21 3:38:50 PM ******/
CREATE NONCLUSTERED INDEX [IX_Classes_facultyID] ON [dbo].[class]
(
	[facultyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Students_classID]    Script Date: 5/19/21 3:38:50 PM ******/
CREATE NONCLUSTERED INDEX [IX_Students_classID] ON [dbo].[student]
(
	[classID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[class]  WITH CHECK ADD  CONSTRAINT [FK_Classes_Faculties_facultyID] FOREIGN KEY([facultyID])
REFERENCES [dbo].[faculty] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[class] CHECK CONSTRAINT [FK_Classes_Faculties_facultyID]
GO
ALTER TABLE [dbo].[course]  WITH CHECK ADD  CONSTRAINT [FK_course_semester] FOREIGN KEY([Semesterid])
REFERENCES [dbo].[semester] ([id])
GO
ALTER TABLE [dbo].[course] CHECK CONSTRAINT [FK_course_semester]
GO
ALTER TABLE [dbo].[course_class]  WITH CHECK ADD  CONSTRAINT [FK_course_class_study_time] FOREIGN KEY([Studytimeid])
REFERENCES [dbo].[study_time] ([id])
GO
ALTER TABLE [dbo].[course_class] CHECK CONSTRAINT [FK_course_class_study_time]
GO
ALTER TABLE [dbo].[evaluation]  WITH CHECK ADD  CONSTRAINT [FK_evaluation_semester] FOREIGN KEY([Semesterid])
REFERENCES [dbo].[semester] ([id])
GO
ALTER TABLE [dbo].[evaluation] CHECK CONSTRAINT [FK_evaluation_semester]
GO
ALTER TABLE [dbo].[evaluation]  WITH CHECK ADD  CONSTRAINT [FK_evaluation_student] FOREIGN KEY([Studentid])
REFERENCES [dbo].[student] ([id])
GO
ALTER TABLE [dbo].[evaluation] CHECK CONSTRAINT [FK_evaluation_student]
GO
ALTER TABLE [dbo].[exam_shedule]  WITH CHECK ADD  CONSTRAINT [FK_exam_shedule_study_time] FOREIGN KEY([studyTimeId])
REFERENCES [dbo].[study_time] ([id])
GO
ALTER TABLE [dbo].[exam_shedule] CHECK CONSTRAINT [FK_exam_shedule_study_time]
GO
ALTER TABLE [dbo].[general]  WITH CHECK ADD  CONSTRAINT [FK_general_semester] FOREIGN KEY([semesterId])
REFERENCES [dbo].[semester] ([id])
GO
ALTER TABLE [dbo].[general] CHECK CONSTRAINT [FK_general_semester]
GO
ALTER TABLE [dbo].[general]  WITH CHECK ADD  CONSTRAINT [FK_general_student] FOREIGN KEY([studentId])
REFERENCES [dbo].[student] ([id])
GO
ALTER TABLE [dbo].[general] CHECK CONSTRAINT [FK_general_student]
GO
ALTER TABLE [dbo].[lesson]  WITH CHECK ADD  CONSTRAINT [FK_lesson_stage] FOREIGN KEY([stageId])
REFERENCES [dbo].[stage] ([id])
GO
ALTER TABLE [dbo].[lesson] CHECK CONSTRAINT [FK_lesson_stage]
GO
ALTER TABLE [dbo].[notification]  WITH CHECK ADD  CONSTRAINT [FK_notification_user_table] FOREIGN KEY([userId])
REFERENCES [dbo].[user_table] ([id])
GO
ALTER TABLE [dbo].[notification] CHECK CONSTRAINT [FK_notification_user_table]
GO
ALTER TABLE [dbo].[parent]  WITH CHECK ADD  CONSTRAINT [FK_parent_student] FOREIGN KEY([Studentid])
REFERENCES [dbo].[student] ([id])
GO
ALTER TABLE [dbo].[parent] CHECK CONSTRAINT [FK_parent_student]
GO
ALTER TABLE [dbo].[Result]  WITH CHECK ADD  CONSTRAINT [FK_Result_study_time1] FOREIGN KEY([Studytimeid])
REFERENCES [dbo].[study_time] ([id])
GO
ALTER TABLE [dbo].[Result] CHECK CONSTRAINT [FK_Result_study_time1]
GO
ALTER TABLE [dbo].[stage]  WITH CHECK ADD  CONSTRAINT [FK_stage_course_class] FOREIGN KEY([courseClassId])
REFERENCES [dbo].[course_class] ([id])
GO
ALTER TABLE [dbo].[stage] CHECK CONSTRAINT [FK_stage_course_class]
GO
ALTER TABLE [dbo].[student]  WITH CHECK ADD  CONSTRAINT [FK_Students_Classes_classID] FOREIGN KEY([classID])
REFERENCES [dbo].[class] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[student] CHECK CONSTRAINT [FK_Students_Classes_classID]
GO
ALTER TABLE [dbo].[study_time]  WITH CHECK ADD  CONSTRAINT [FK_study_time_course1] FOREIGN KEY([Courseid])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[study_time] CHECK CONSTRAINT [FK_study_time_course1]
GO
ALTER TABLE [dbo].[study_time]  WITH CHECK ADD  CONSTRAINT [FK_study_time_semester] FOREIGN KEY([semesterId])
REFERENCES [dbo].[semester] ([id])
GO
ALTER TABLE [dbo].[study_time] CHECK CONSTRAINT [FK_study_time_semester]
GO
ALTER TABLE [dbo].[study_time]  WITH CHECK ADD  CONSTRAINT [FK_study_time_student] FOREIGN KEY([studentId])
REFERENCES [dbo].[student] ([id])
GO
ALTER TABLE [dbo].[study_time] CHECK CONSTRAINT [FK_study_time_student]
GO
ALTER TABLE [dbo].[teacher]  WITH CHECK ADD  CONSTRAINT [FK_teacher_class] FOREIGN KEY([Classid])
REFERENCES [dbo].[class] ([id])
GO
ALTER TABLE [dbo].[teacher] CHECK CONSTRAINT [FK_teacher_class]
GO
ALTER TABLE [dbo].[user_table]  WITH CHECK ADD  CONSTRAINT [FK_user_table_role] FOREIGN KEY([Roleid])
REFERENCES [dbo].[role] ([id])
GO
ALTER TABLE [dbo].[user_table] CHECK CONSTRAINT [FK_user_table_role]
GO
USE [master]
GO
ALTER DATABASE [NCKH] SET  READ_WRITE 
GO
