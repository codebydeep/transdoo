terraform {
  backend "s3" {
    bucket  = "transdoo-terraform-state"
    key     = "ec2/terraform.tfstate"
    region  = "ap-southeast-2"
    encrypt = true
    # use_lockfile = true
  }
}
