output "instance_ids" {
  value       = aws_instance.my-instance[*].id
}

output "instance_public_ips" {
  value       = aws_instance.my-instance[*].public_ip
}

output "security_group_id" {
  value       = aws_security_group.ec2_sg.id
}

output "vpc_id" {
  value       = aws_default_vpc.default.id
}

output "instance_public_ip" {
  value = aws_instance.my-instance[0].public_ip
}