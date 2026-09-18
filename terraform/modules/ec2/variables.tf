variable "public_key_path" {
  type        = string
}

variable "key_name" {
  type        = string
  default     = "ec2_key"
}

variable "security_group_name" {
  type        = string
  default     = "transdoo-ec2"
}

variable "instance_count" {
  type        = number
  default     = 1
}

variable "instance_type" {
  type        = string
}

variable "ami" {
  type        = string
}

variable "volume_type" {
  type        = string
  default     = "gp3"
}

variable "volume_size" {
  type        = number
  default     = 20
}

variable "instance_name" {
  type        = string
  default     = "transdoo"
}
