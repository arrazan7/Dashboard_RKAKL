-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2023 at 01:51 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rkakp`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lembaga`
--

CREATE TABLE `lembaga` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_10_06_101644_create_rkakl_components_table', 1),
(6, '2023_10_06_102132_create_rkakl_data_table', 1),
(7, '2023_10_06_102433_create_rkakl_document_table', 1),
(8, '2023_10_06_102618_create_lembaga_table', 1),
(9, '2023_10_06_102748_create_unit_organisasi_table', 1),
(10, '2023_10_06_102854_create_unit_kerja_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'my-token', '54d142791af2a1ea7ffde58e705d03d9944d9bdf385784c543c5fc669292ab5c', '[\"*\"]', '2023-11-22 17:45:18', NULL, '2023-11-22 17:43:46', '2023-11-22 17:45:18');

-- --------------------------------------------------------

--
-- Table structure for table `rkakl_components`
--

CREATE TABLE `rkakl_components` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unit_kerja_code` varchar(255) NOT NULL,
  `program_code` varchar(255) NOT NULL,
  `program_name` varchar(255) NOT NULL,
  `kegiatan_code` varchar(255) NOT NULL,
  `kegiatan_name` varchar(255) NOT NULL,
  `kro_code` varchar(255) NOT NULL,
  `kro_name` varchar(255) NOT NULL,
  `ro_code` varchar(255) NOT NULL,
  `ro_name` varchar(255) NOT NULL,
  `komponen_code` varchar(255) NOT NULL,
  `komponen_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rkakl_components`
--

INSERT INTO `rkakl_components` (`id`, `unit_kerja_code`, `program_code`, `program_name`, `kegiatan_code`, `kegiatan_name`, `kro_code`, `kro_name`, `ro_code`, `ro_name`, `komponen_code`, `komponen_name`, `created_at`, `updated_at`) VALUES
(1, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', '078', 'Layanan Dukungan Pengawasan Spektrum Frekuensi Radio UPT', '100', 'SBML', NULL, NULL),
(2, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', '078', 'Layanan Dukungan Pengawasan Spektrum Frekuensi Radio UPT', '101', 'Dukungan Tupoksi', NULL, NULL),
(3, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', '078', 'Layanan Dukungan Pengawasan Spektrum Frekuensi Radio UPT', '102', 'Peningkatan Sarana Prasarana Perkantoran', NULL, NULL),
(4, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', '078', 'Layanan Dukungan Pengawasan Spektrum Frekuensi Radio UPT', '103', 'Peningkatan Sarana Prasarana Pengawasan', NULL, NULL),
(5, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U13', 'Pemantauan, Pengukuran dan Penanganan Gangguan Frekuensi Radio Dalam Kota Wilayah Kalimantan', '101', 'Persiapan Kegiatan', NULL, NULL),
(6, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U13', 'Pemantauan, Pengukuran dan Penanganan Gangguan Frekuensi Radio Dalam Kota Wilayah Kalimantan', '102', 'Pelaksanaan Kegiatan', NULL, NULL),
(7, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U14', 'Pemantauan, Pengukuran dan Penanganan Gangguan Frekuensi Radio Luar Kota Transportasi Darat Wilayah Kalimantan', '101', 'Persiapan Kegiatan', NULL, NULL),
(8, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U14', 'Pemantauan, Pengukuran dan Penanganan Gangguan Frekuensi Radio Luar Kota Transportasi Darat Wilayah Kalimantan', '102', 'Pelaksanaan Kegiatan', NULL, NULL),
(9, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U15', 'Pemantauan, Pengukuran dan Penanganan Gangguan Frekuensi Radio Luar Kota Transportasi Udara Wilayah Kalimantan', '101', 'Persiapan Kegiatan', NULL, NULL),
(10, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U16', 'Pemantauan, Pengukuran dan Penanganan Gangguan Frekuensi Radio Luar Kota Transportasi Laut/Sungai Wilayah Kalimantan', '102', 'Pelaksanaan Kegiatan', NULL, NULL),
(11, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U17', 'Penertiban Frekuensi Radio dan Standar Perangkat Pos dan Informatika Dalam Kota Wilayah Kalimantan', '101', 'Persiapan Kegiatan', NULL, NULL),
(12, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U18', 'Penertiban Frekuensi Radio dan Standar Perangkat Pos dan Informatika Luar Kota Transportasi Darat Wilayah Kalimantan', '102', 'Pelaksanaan Kegiatan', NULL, NULL),
(13, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U19', 'Penertiban Frekuensi Radio dan Standar Perangkat Pos dan Informatika Luar Kota Transportasi Udara Wilayah Kalimantan', '101', 'Persiapan Kegiatan', NULL, NULL),
(14, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'BAH', 'BAH Pelayanan Publik Lainnya', 'U20', 'Penertiban Frekuensi Radio dan Standar Perangkat Pos dan Informatika Luar Kota Transportasi Laut/Sungai Wilayah Kalimantan', '102', 'Pelaksanaan Kegiatan', NULL, NULL),
(15, '417638', '059.03.GE', 'Progam Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'CCL', 'OM Sarana Bidang Teknologi Informasi dan Komunikasi', '101', 'Pemeliharaan Alat Monitoring UPT', '101', 'Pemeliharaan dan Kalibrasi Alat Monitoring UPT', NULL, NULL),
(16, '417638', '059.03.GE', 'Program Pengelolaan SFR, Standar Perangkat dan Layanan Publik ', '6492', 'Monitoring dan Pengendalian Spektrum Frekuensi Radio', 'CAN', 'CAN Sarana Bidang Teknologi Informasi dan Komunikasi', '101', 'Perangkat Monitoring UPT', '306', 'Pengadaan Perangkat Monitoring UPT', NULL, NULL),
(17, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBA', 'Layanan Dukungan Manajemen Internal', '960', 'Layanan Organisasi dan Tata Kelola Internal', '105', 'Layanan Dukungan Teknis UPT', NULL, NULL),
(18, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBA', 'Layanan Dukungan Manajemen Internal', '994', 'Layanan Perkantoran', '001', 'Gaji dan Tunjangan', NULL, NULL),
(19, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBA', 'Layanan Dukungan Manajemen Internal', '994', 'Layanan Perkantoran', '002', 'Operasional dan Pemeliharaan Kantor', NULL, NULL),
(20, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBB', '	Layanan Sarana dan Prasarana Internal', '951', 'Layanan Sarana Internal', '301', 'Pengadaan kendaraan bermotor UPT', NULL, NULL),
(21, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBB', '	Layanan Sarana dan Prasarana Internal', '951', 'Layanan Sarana Internal', '302', 'Pengadaan perangkat pengolah data UPT', NULL, NULL),
(22, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBB', '	Layanan Sarana dan Prasarana Internal', '951', 'Layanan Sarana Internal', '303', 'Pengadaan peralatan dan fasilitas perkantoran UPT', NULL, NULL),
(23, '417638', '059.03.WA', 'Program Dukungan Manajemen', '4499', 'Penyelenggaraan Layanan Publik Bidang Frekuensi dan Perangkat TIK', 'EBB', '	Layanan Sarana dan Prasarana Internal', '951', 'Layanan Sarana Internal', '304', 'Pembangunan/renovasi gedung dan bangunan UPT', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rkakl_data`
--

CREATE TABLE `rkakl_data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `document_id` bigint(20) NOT NULL,
  `parent_component` bigint(20) DEFAULT NULL,
  `component_code` varchar(255) DEFAULT NULL,
  `type` enum('program','kegiatan','kro','ro','komponen','subkomponen','detail','sub-detail') NOT NULL,
  `custom_name` varchar(255) DEFAULT NULL,
  `amount` bigint(20) NOT NULL DEFAULT 0,
  `volume` varchar(255) NOT NULL DEFAULT '',
  `total_amount` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rkakl_document`
--

CREATE TABLE `rkakl_document` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lembaga_code` varchar(255) NOT NULL,
  `unit_org_code` varchar(255) NOT NULL,
  `unit_kerja_code` varchar(255) NOT NULL,
  `version` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unit_kerja`
--

CREATE TABLE `unit_kerja` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unit_organisasi_code` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unit_organisasi`
--

CREATE TABLE `unit_organisasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lembaga_code` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, '$2y$10$6xFGJjrPJirUVqSatBEwQ.L/AvViQ8tlT52Yn1wuofGxQD68F.1Vy', 'admin', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `lembaga`
--
ALTER TABLE `lembaga`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lembaga_code_unique` (`code`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rkakl_components`
--
ALTER TABLE `rkakl_components`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rkakl_data`
--
ALTER TABLE `rkakl_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rkakl_document`
--
ALTER TABLE `rkakl_document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unit_kerja_code_unique` (`code`);

--
-- Indexes for table `unit_organisasi`
--
ALTER TABLE `unit_organisasi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unit_organisasi_code_unique` (`code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lembaga`
--
ALTER TABLE `lembaga`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rkakl_components`
--
ALTER TABLE `rkakl_components`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `rkakl_data`
--
ALTER TABLE `rkakl_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rkakl_document`
--
ALTER TABLE `rkakl_document`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `unit_organisasi`
--
ALTER TABLE `unit_organisasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
