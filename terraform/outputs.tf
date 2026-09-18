output "instance_ids" {
  value = module.ec2.instance_ids
}

output "instance_public_ips" {
  value = module.ec2.instance_public_ips
}

output "security_group_id" {
  value = module.ec2.security_group_id
}

output "vpc_id" {
  value = module.ec2.vpc_id
}
