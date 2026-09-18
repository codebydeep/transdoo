resource "aws_key_pair" "ec2_keys" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
}

resource "aws_default_vpc" "default" {

}

resource "aws_security_group" "ec2_sg" {
  name   = var.security_group_name
  vpc_id = aws_default_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "my-instance" {
  count           = var.instance_count
  key_name        = var.key_name
  security_groups = [aws_security_group.ec2_sg.name]
  instance_type   = var.instance_type
  ami             = var.ami

  root_block_device {
    volume_type = var.volume_type
    volume_size = var.volume_size
  }

  tags = {
    Name = var.instance_name
  }
}