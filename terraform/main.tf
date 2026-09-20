module "ec2" {
  source = "./modules/ec2"

  public_key_path     = var.public_key_path
  key_name            = var.key_name
  security_group_name = var.security_group_name
  instance_count      = var.instance_count
  instance_type       = var.instance_type
  ami                 = var.ami
  volume_type         = var.volume_type
  volume_size         = var.volume_size
  instance_name       = var.instance_name
}
